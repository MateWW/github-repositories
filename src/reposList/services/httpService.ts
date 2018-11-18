export interface HttpParams {
    body?: any;
    params?: Record<string, string>;
}

export class HttpService {
    public get<T>(url: string, params: Record<string, string> = {}): Promise<T> {
        return this.httpRequest<T>(url, 'GET', { params });
    }

    public post<T>(url: string, body: any): Promise<T> {
        return this.httpRequest<T>(url, 'POST', { body });
    }

    public httpRequest<T>(url: string, method: 'GET' | 'POST', { body, params }: HttpParams): Promise<T> {
        const queryString = Object.entries(params || {}).reduce(
            (acc, [key, value]) => `${acc}${acc.length ? '&' : ''}${key}=${value}`,
            '',
        );
        const extendedUrl = url + encodeURI('?' + queryString);

        return fetch(extendedUrl, {
            headers: { 'Content-Type': 'application/json' },
            method,
            body: JSON.stringify(body),
        }).then(response => (response.status !== 200 ? Promise.reject(response) : response.json()));
    }
}
