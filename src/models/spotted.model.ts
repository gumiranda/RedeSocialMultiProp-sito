export class Spotted {
    public $key : string;
    public ultimoComentario?: string;

    constructor(
        public titulo: string,
        public conteudo:string,
        public photo: string,
        public userId : string,
        public userNome:string,
        public userPhoto:string,
        public timestamp : any
       ) { }

}