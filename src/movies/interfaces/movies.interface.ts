export interface Movie{
	id?:string;
	title:string;
	meta:{
		rating:number;
		aired:number;
		runtime:number;
	};
	visitors:number;
	expectedVisitors: number;
	genre:[string];
}