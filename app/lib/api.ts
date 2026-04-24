import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    console.log("Initializing HttpClient with baseURL:", API_URL);
    this.instance = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    // Request Interceptor: Add Auth Token
    this.instance.interceptors.request.use(
      (config) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor: Handle Global Errors
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const message = error.response?.data?.message || error.message || "Something went wrong";
        // You could handle 401 Unauthorized here (e.g., redirect to login)
        return Promise.reject(new Error(message));
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.patch<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }

  // Legacy compatibility wrapper
  public async fetchApi<T>(endpoint: string, options: any = {}): Promise<T> {
    let data = options.body;
    if (typeof data === "string") {
      try { data = JSON.parse(data); } catch (e) {}
    }

    const config: AxiosRequestConfig = {
      url: endpoint,
      method: options.method || "GET",
      data: data,
      headers: options.headers,
    };

    const response = await this.instance(config);
    return response.data;
  }
}

const httpClient = new HttpClient();

export const fetchApi = httpClient.fetchApi.bind(httpClient);
export default httpClient;
