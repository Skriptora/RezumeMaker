import { useResumeStore } from './useResumeStore'

export * from './useResumeStore'

/**
 * Main application Zustand store hook.
 * Exposes full state including `selectedElementId` (string | null) and `setSelectedElementId(id)`.
 */
export const useStore = useResumeStore
export default useResumeStore
