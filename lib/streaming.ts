export async function streamToResponse(
    stream: ReadableStream,
    response: Response
  ): Promise<void> {
    const reader = stream.getReader();
    const encoder = new TextEncoder();
  
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
  
      const chunk = encoder.encode(value);
    
      await response.write(chunk);
    }
  
 
    await response.end();
  }