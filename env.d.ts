/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_BASE_API_URL: string;
  readonly VITE_API_AUTH_PREFIX: string;
  readonly VITE_API_VERSION_PREFIX: string;
  readonly VITE_IS_TEST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
