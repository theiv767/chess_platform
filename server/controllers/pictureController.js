const fs = require("fs");
const Picture = require("../model/db/Picture");


exports.create = async (req, res) => {
  try {
    const { name, userId } = req.body;

    const file = req.file;
    const picture = new Picture({
      name,
      userId,
      src: file.path,
    });

    await picture.save();

    // IMPORTANTE !!!
    //verificar se o userId já tinha alguma imagem, se tiver: revomer imagem antiga

    console.log(picture)
    res.json(picture);
  } catch (err) {
    console.log("erro ao salvar imagem")
    console.log(err)
    res.status(500).json({ message: "Erro ao salvar a imagem." });
  }
};


exports.remove = async (req, res) => {
  try {
    const picture = await Picture.findById(req.params.id);
    if (!picture) {
      return res.status(404).json({ message: "Imagem não encontrada" });
    }
    fs.unlinkSync(picture.src);
    await picture.remove();
    res.json({ message: "Imagem removida com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao remover a imagem" });
  }
};


exports.findAll = async (req, res) => {
  try {
    const pictures = await Picture.find();
    res.json(pictures);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar as imagens." });
  }
};


exports.findOne = async (req, res) => {
  try {
    const userId = req.params.id
    const picture = await Picture.findOne({ userId })
    if(picture){
      res.status(200).json(picture.src);  
    }else{
      res.status(404).json({ message: "imagem não encontrada!" });
    }

  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar as imagens!" });
  }
}