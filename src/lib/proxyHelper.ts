import https from 'https';

const API_BASE_URL = 'https://stage73.q2.cz/q2onboarding/q2/posts';
const API_KEY = 'your-api-key-here'; // Replace with your actual API key

interface ProxyRequest {
  endpoint: string;
  method?: string;
  data?: object;
}

interface ProxyResponse {
  status?: number;
  data: unknown;
  error?: string;
}

export async function makeProxyRequest({ endpoint, method = 'GET', data = {} }: ProxyRequest): Promise<ProxyResponse> {
  const MAX_RETRIES = 5;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await makeHttpRequest(endpoint, method, data);
      
      // If successful (2xx), return the result
      if (!result.status || result.status < 300) {
        return result;
      }
      
      // If it's an error status and we've reached max retries, return the error
      if (attempt === MAX_RETRIES) {
        return result;
      }
      
      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s, 8s
      console.log(`HTTP error ${result.status}, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      
      if (attempt === MAX_RETRIES) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s, 8s
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error('Max retries exceeded');
}

async function makeHttpRequest(endpoint: string, method: string, data: object): Promise<ProxyResponse> {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(`${API_BASE_URL}${endpoint}`);
    
    // Add API key to request data
    const bodyData = {
      token: API_KEY,
      ...data,
    };
    
    const body = JSON.stringify(bodyData);
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const jsonData = JSON.parse(responseData);
          
          resolve({
            status: res.statusCode,
            data: jsonData,
          });
        } catch {
          resolve({
            status: res.statusCode,
            data: responseData,
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(body);
    req.end();
  });
}
