var model = {
    get id() {
        return this._id ; 
    },
    set id(id) {
        this._id = id || '';
    },
    get filename(){
      return this._filename ; 
    },
    set filename(name){
      this._filename = name || ''; 
    },
    get savename(){
      return this._savename ; 
    },
    set savename(name){
      this._savename = name || ''; 
    },
    get filetype(){
      return this._filetype ; 
    },
    set filetype(name){
      this._filetype = name || ''; 
    },
    get thumbnail(){
      return this._thumbnail ; 
    },
    set thumbnail(name){
      this._thumbnail = name || ''; 
    },
    get name(){
      return this._name ; 
    },
    set name(name){
      this._name = name || ''; 
    },
    get image(){
      return this._image ; 
    },
    set image(name){
      this._image = name || '900x300.png'; 
    },
    get author(){
      return this._author ; 
    },
    set author(name){
      this._author = name || ''; 
    },
    get timestamp(){
      return this._timestamp ; 
    },
    set timestamp(name){
      this._timestamp = name || ''; 
    },
    get path(){
      return this._path ; 
    },
    set path(name){
      this._path = name+"-address" || ''; 
    },
    get description(){
      return this._description ; 
    },
    set description(name){
      this._description = name || ''; 
    },
    get content(){
      return this._content ; 
    },
    set content(name){
      this._content = name || ''; 
    }
};

module.exports = function(parm){
  model.id = parm.id ; 
  model.filename = parm.filename ; 
  model.savename = parm.savename ; 
  model.filetype = parm.filetype;
  model.thumbnail = parm.thumbnail;
  model.name = parm.name;
  model.image = parm.image;
  model.author = parm.author; 
  model.timestamp = parm.timestamp;
  model.path = parm.path;
  model.description = parm.description;
  model.content = parm.content; 
  console.log(model.id);
  return model ; 
}; 