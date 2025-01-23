class WebSocketService {
    private socket: WebSocket | null = null;
    private onMessageCallback: (() => void) | null = null;
  
    public connect() {
        this.socket = new WebSocket('ws://172.31.33.94:3002');
  
        this.socket.onopen = () => {
            console.log('WebSocket connection established');
        };
  
        this.socket.onmessage = (message) => {
            console.log('Message from server ', message.data);
            
            if (this.onMessageCallback) {
                this.onMessageCallback();
            }
        };
    }

    public disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
            console.log('WebSocket disconnected');
        }
    } 
  
    public setOnMessageCallback(callback: () => void) {
      this.onMessageCallback = callback;
    }
}
  
export const webSocketService = new WebSocketService();
