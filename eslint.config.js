// eslint.config.js
import js from "@eslint/js";
import pluginJest from "eslint-plugin-jest";
import globals from "globals";

export default [
    // 1. Configuração geral para todos os arquivos JavaScript
    {
        files: ["**/*.js"], // Aplica a todos os arquivos .js
        ...js.configs.recommended, // Carrega as regras "eslint:recommended"
        languageOptions: {
            ecmaVersion: "latest", // Equivalente a "parserOptions.ecmaVersion"
            sourceType: "module",   // Equivalente a "parserOptions.sourceType"
            globals: {
                ...globals.node, // Equivalente a "env: { node: true }"
            },
        },
    },

    // 2. Configuração específica para os arquivos de teste do Jest
    {
        files: ["**/*.test.js", "**/*.spec.js"], // Aplica regras do Jest apenas em arquivos de teste
        plugins: {
            jest: pluginJest, // Equivalente a "plugins: [ 'jest' ]"
        },
        languageOptions: {
            globals: {
                ...pluginJest.environments.globals.globals, // Equivalente a "env: { jest/globals: true }"
            },
        },
        rules: {
            // Carrega as regras recomendadas do plugin Jest
            ...pluginJest.configs.recommended.rules,
            // Suas regras personalizadas
            "jest/no-disabled-tests": "warn",
            "jest/no-conditional-expect": "error",
            "jest/no-identical-title": "error",
        },
    },
];