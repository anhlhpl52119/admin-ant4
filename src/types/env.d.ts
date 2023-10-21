/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_DESTINATION: string;
  readonly VITE_API_AUTH_PREFIX: string;
  readonly VITE_API_SIGNATURE_PREFIX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
