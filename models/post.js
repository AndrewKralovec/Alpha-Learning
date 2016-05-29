var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/Courses';
var db = MongoClient.connect(url); 

// Generate unique address
function genAddress(address){
  return (address+'-'+new Date().toISOString()); 
}
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
      this._name = name !== undefined ? name : 'Default Title';
    },
    get image(){
      return this._image ; 
    },
    set image(name){
      this._image = name !== undefined ? name : '900x300.png'; 
    },
    get author(){
      return this._author ; 
    },
    set author(name){
      this._author = name !== undefined ? name : 'Anonymouse'; 
    },
    get timestamp(){
      return this._timestamp ; 
    },
    set timestamp(time){
      this._timestamp = time !== undefined ? time : Date.now(); 
    },
    get path(){
      return this._path ; 
    },
    set path(path){
      this._path = path !== undefined ? path+"-address" : genAddress(this._name)+'-address'; 
    },
    get description(){
      return this._description ; 
    },
    set description(description){
      this._description = description !== undefined ? description : 'empty description'; 
    },
    get content(){
      return this._content ; 
    },
    set content(content){
      this._content = content !== undefined ? content : 'empty content'; 
    }
};

module.exports = function(parm){
  // Define model properties
  for(var prop in model)
    model[prop] = parm[prop] ; 
  return model ; 
}; 