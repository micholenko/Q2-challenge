import { makeProxyRequest } from './proxyHelper';

const PROXY_URL = '/api/proxy';

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: {
    date: string;
    timezone: string;
    timezone_type: number;
  };
  author: string;
  image: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  author: string;
}

// Generic API request function with environment detection
async function apiRequest(endpoint: string, method: string = 'POST', data?: object) {
  // During build time (SSG/ISR) or server-side, use direct proxy helper
  if (typeof window === 'undefined') {
    const result = await makeProxyRequest({
      endpoint,
      method,
      data,
    });
    
    if (result.status && result.status >= 400) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }
    
    return result.data;
  }

  // For client-side or development, use the proxy API route
  try {
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXTJS_URL || 'http://localhost:3000'
      : '';
    
    const proxyUrl = `${baseUrl}${PROXY_URL}`;

    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint,
        method,
        data,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// API functions
export const api = {
  // Get list of posts
  async getPosts(): Promise<Post[]> {
    const response = await apiRequest('/list', 'GET');
    
    if (response && typeof response === 'object' && 'applications' in response) {
      return response.applications;
    }
    
    return response;
  },

  // Get single post by ID
  async getPost(id: number): Promise<Post> {
    const response = await apiRequest(`/view/${id}`, 'GET');
    
    if (response && 'post' in response) {
      return response.post;
    }
    return response;
  },

  // Create new post
  async createPost(postData: CreatePostData): Promise<Post> {
    return await apiRequest('/create', 'POST', postData);
  },
};

export default api;
