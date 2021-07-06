import {SubscribeMessage,MessageBody, WebSocketServer, WebSocketGateway} from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway{
	@WebSocketServer()
	server;

	@SubscribeMessage('message')
	handleMessage(@MessageBody() message: string): void{
		//this.server.emit('message',message);
		this.server.emit('message',message);
		console.log(message);
		//console.log(message.data);
		console.log(typeof(message));
		var rel= JSON.stringify(message);
		console.log(rel);
		console.log(typeof(rel));
		var mess=JSON.parse(rel).data;
		console.log(mess);
		if(mess=='đúng'){
			console.log("True");
			//var mes2="đúng";
		
		}else{
			console.log("False");
		}
		// if(message==='true'){
		// 	console.log("True");

		
	}
}