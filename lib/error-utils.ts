/**
 * Parse error response from API
 * Handles both FastAPI validation errors (array of objects) and simple string errors
 */
export function parseApiError(err: any, fallbackMessage: string = 'An error occurred'): string {
    const detail = err.response?.data?.detail;

    // Handle FastAPI validation errors which come as an array
    if (Array.isArray(detail) && detail.length > 0) {
        return detail[0].msg || 'Validation error';
    }

    // Handle simple string errors
    if (typeof detail === 'string') {
        return detail;
    }

    // Fallback
    return fallbackMessage;
}
