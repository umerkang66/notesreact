/**
 * Deduplicates and hoists ES module imports across cumulative notebook cells.
 * Prevents "Identifier has already been declared" build errors in esbuild when
 * multiple cells import the same packages (e.g. useState, React, axios).
 */

interface ModuleImports {
  defaultImports: Set<string>;
  namespaceImports: Set<string>;
  namedImports: Set<string>;
  isSideEffect: boolean;
}

export const deduplicateImports = (codeChunks: string[]): string => {
  const moduleMap = new Map<string, ModuleImports>();
  const cleanedChunks: string[] = [];

  // Match import statements, including multiline imports
  // e.g. import React, { useState } from 'react';
  // e.g. import * as React from 'react';
  // e.g. import axios from 'axios';
  // e.g. import 'bulmaswatch/default/bulmaswatch.min.css';
  const generalImportRegex = /(^|\n)\s*import\s+([\s\S]*?from\s+)?['"]([^'"]+)['"]\s*;?/g;

  for (const chunk of codeChunks) {
    if (!chunk) continue;

    let cleaned = chunk;
    generalImportRegex.lastIndex = 0;
    let match: RegExpExecArray | null;

    const importsToProcess: { fullMatch: string; clause?: string; modulePath: string }[] = [];

    while ((match = generalImportRegex.exec(chunk)) !== null) {
      const fullMatch = match[0];
      const clause = match[2];
      const modulePath = match[3];

      importsToProcess.push({
        fullMatch,
        clause: clause ? clause.replace(/from\s*$/, '').trim() : undefined,
        modulePath,
      });
    }

    for (const { fullMatch, clause, modulePath } of importsToProcess) {
      if (!moduleMap.has(modulePath)) {
        moduleMap.set(modulePath, {
          defaultImports: new Set<string>(),
          namespaceImports: new Set<string>(),
          namedImports: new Set<string>(),
          isSideEffect: false,
        });
      }

      const mod = moduleMap.get(modulePath)!;

      if (!clause) {
        mod.isSideEffect = true;
      } else {
        let remaining = clause.trim();

        // Check for named imports {...}
        const namedMatch = remaining.match(/\{([^}]*)\}/);
        if (namedMatch) {
          const names = namedMatch[1]
            .split(',')
            .map(n => n.trim())
            .filter(Boolean);
          names.forEach(n => mod.namedImports.add(n));

          remaining = remaining.replace(/\{[^}]*\}/, '').replace(/,/g, '').trim();
        }

        // Check for namespace import "* as foo"
        const namespaceMatch = remaining.match(/\*\s+as\s+([A-Za-z0-9_$]+)/);
        if (namespaceMatch) {
          mod.namespaceImports.add(namespaceMatch[1]);
          remaining = remaining.replace(/\*\s+as\s+[A-Za-z0-9_$]+/, '').replace(/,/g, '').trim();
        }

        // If there's still an identifier left, it's a default import
        if (remaining && /^[A-Za-z0-9_$]+$/.test(remaining)) {
          mod.defaultImports.add(remaining);
        }
      }

      cleaned = cleaned.replace(fullMatch, '\n');
    }

    cleanedChunks.push(cleaned);
  }

  // Construct the hoisted imports at the top
  const hoistedImports: string[] = [];

  moduleMap.forEach((mod, modulePath) => {
    // Default imports
    mod.defaultImports.forEach(def => {
      hoistedImports.push(`import ${def} from '${modulePath}';`);
    });

    // Namespace imports
    mod.namespaceImports.forEach(ns => {
      hoistedImports.push(`import * as ${ns} from '${modulePath}';`);
    });

    // Named imports
    if (mod.namedImports.size > 0) {
      hoistedImports.push(`import { ${Array.from(mod.namedImports).join(', ')} } from '${modulePath}';`);
    }

    // Pure side-effect import
    if (mod.isSideEffect && mod.defaultImports.size === 0 && mod.namespaceImports.size === 0 && mod.namedImports.size === 0) {
      hoistedImports.push(`import '${modulePath}';`);
    }
  });

  return `${hoistedImports.join('\n')}\n${cleanedChunks.join('\n')}`;
};
