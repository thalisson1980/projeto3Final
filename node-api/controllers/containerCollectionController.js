const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authToken = require('../token/secret.json');
const authMiddleware = require('../middlewares/auth');
const { v4: uuidv4 } = require('uuid');
const containerCollection = require('../models/containerCollection');
const user = require('../models/user');
const container = require('../models/container');
const Collection = require('../models/collection');
const Key = require('../models/key');

const bd = require('../bd/ligacao');



router.post('/findByUser', async(req, res) => {
    try {

        const User = await user.findOne({ email: req.body.email });
        const chaves = await Key.find({ user: User._id })
        var mysort = { collectionDate: -1 };

        let respostaFinal = [];
        for (const chave of chaves) {

            const containerCollections = await containerCollection.find({ key: chave._id }).sort(mysort);
            let vetorCollections = [];
            for (let i = 0; i < containerCollections.length; i++) {
                let existe = false;
                for (let j = 0; j < vetorCollections.length; j++) {

                    if (containerCollections[i].collectionID === vetorCollections[j]._id.toString()) {
                        existe = true;

                    }
                }
                if (!existe) {

                    await Collection.findById(containerCollections[i].collectionID)
                        .then(found => {
                            vetorCollections.push(found);
                        })
                        .catch(err => {
                            console.log(err)
                        })

                }
            }

            for (const Element of vetorCollections) {
                let resposta = []
                let containerCollections = await containerCollection.find({ collectionID: Element._id.toString(), key: chave._id })
                let allCollections = await containerCollection.find({ collectionID: Element._id.toString() })
                for (const collect of containerCollections) {
                    let existe = false;
                    try {
                        for (let i = 0; resposta.length; i++) {
                            if (collect.container === resposta[i].container) {
                                resposta[i].massaCollect_kg = resposta[i].massaCollect_kg + Element.massaCollect_kg / allCollections.length;
                                existe = true;
                            }
                        }
                    } catch (err) {

                    } finally {
                        if (!existe) {
                            let obj = {
                                container: collect.container,
                                massaCollect_kg: Element.massaCollect_kg / allCollections.length,
                                collectionDate: Element.dateEndTime
                            }
                            resposta.push(obj);

                        }
                    }
                }

                for (unico of resposta) {
                    respostaFinal.push(unico)
                }


            }
        }
        res.json({ collections: respostaFinal })
    } catch (err) {

        res.json({ message: err })
    }

});

router.post('/dates', async(req, res) => {
    console.log(req.body)
    var firstCollect = new Date();
    var lastCollect = new Date();
    lastCollect.setFullYear('1900');
    firstCollect.setFullYear('3000')


    var queryClient = { email: req.body.email };
    const User = await user.findOne(queryClient)
    const chaves = await Key.find({ user: User._id });

    let collectionsList = [];

    for (const chaveUser of chaves) {


        if (req.body.choice == 'county' || req.body.choice == "recolha") {
            var queryCode = { ddccff: req.body.code.substring(0, 4) };
            let containers = await container.find({ $regex: queryCode + ".*" });
            if (req.body.choice == "recolha") {
                containers = await container.find();
            }
            for (const Element of containers) {
                if (Element.ddccff.substring(0, 4) == req.body.code.substring(0, 4) || req.body.choice == "recolha") {
                    var collections = await containerCollection.find({ container: Element._id, key: chaveUser._id });
                    for (const collect of collections) {

                        let collectAtual = await Collection.findOne({ _id: collect.collectionID })
                        let aux = await containerCollection.find({ collectionID: collect.collectionID })
                        if (collectAtual.dateEndTime < firstCollect) {
                            firstCollect = collectAtual.dateEndTime;
                        }
                        if (collectAtual.dateEndTime > lastCollect) {
                            lastCollect = collectAtual.dateEndTime;
                        }

                        let existeCollect = false;
                        for (const collection of collectionsList) {
                            if (collection.collection === collectAtual._id.toString()) {

                                collection.numberCollections = collection.numberCollections + 1;
                                existeCollect = true;
                            }

                        }
                        if (!existeCollect) {
                            let colecoesUnicas = [];
                            let nColecoesZona = 0;
                            for (const colecao of aux) {
                                let existe = false;
                                if (colecao.key != chaveUser._id) {
                                    nColecoesZona = nColecoesZona + 1;
                                }
                                for (const chave of colecoesUnicas) {
                                    if (chave == colecao.key) {
                                        existe = true;

                                    }
                                }
                                if (!existe) {
                                    colecoesUnicas.push(colecao.key)
                                }
                            }

                            collectionsList.push({ colecoesZona: nColecoesZona, colecoesUnicas: colecoesUnicas.length - 1, collection: collectAtual._id.toString(), massaCollect_kg: collectAtual.massaCollect_kg, numberCollections: 1, collectionDate: collectAtual.dateEndTime, totalCollections: aux.length });
                        }

                    }
                }
            }


        }
        if (req.body.choice == 'parish') {
            const containers = await container.find({ ddccff: req.body.code });
            for (const Element of containers) {
                var collections = await containerCollection.find({ container: Element.container_cod, key: chaveUser._id });
                for (const collect of collections) {
                    let collectAtual = await Collection.findOne({ _id: collect.collectionID })
                    let aux = await containerCollection.find({ collectionID: collect.collectionID })
                    if (collectAtual.dateEndTime < firstCollect) {
                        firstCollect = collectAtual.dateEndTime;
                    }
                    if (collectAtual.dateEndTime > lastCollect) {
                        lastCollect = collectAtual.dateEndTime;
                    }

                    let existeCollect = false;
                    for (const collection of collectionsList) {
                        if (collection.collection === collectAtual._id.toString()) {

                            collection.numberCollections = collection.numberCollections + 1;
                            existeCollect = true;
                        }
                    }
                    if (!existeCollect) {
                        let colecoesUnicas = [];
                        let nColecoesZona = 0;
                        for (const colecao of aux) {
                            const contentor = await container.findOne({ container_cod: colecao.container })
                            if (contentor.ddccff == req.body.code) {
                                let existe = false;
                                if (colecao.key != chaveUser._id) {
                                    nColecoesZona = nColecoesZona + 1;
                                }
                                for (const chave of colecoesUnicas) {
                                    if (chave == colecao.key) {
                                        existe = true;
                                    }
                                }
                                if (!existe) {
                                    colecoesUnicas.push(colecao.key)
                                }
                            }

                        }
                        collectionsList.push({ colecoesZona: nColecoesZona, colecoesUnicas: colecoesUnicas.length - 1, collection: collectAtual._id.toString(), massaCollect_kg: collectAtual.massaCollect_kg, numberCollections: 1, collectionDate: collectAtual.dateEndTime, totalCollections: aux.length });
                    }
                }

            }

        }

        if (req.body.choice == 'container') {

            var queryContainer = { container: req.body.id, key: chaveUser._id };
            var collections = await containerCollection.find(queryContainer);
            for (const collect of collections) {
                let collectAtual = await Collection.findOne({ _id: collect.collectionID })
                let aux = await containerCollection.find({ collectionID: collect.collectionID })
                if (collectAtual.dateEndTime < firstCollect) {
                    firstCollect = collectAtual.dateEndTime;
                }
                if (collectAtual.dateEndTime > lastCollect) {
                    lastCollect = collectAtual.dateEndTime;
                }

                let existeCollect = false;
                for (const collection of collectionsList) {
                    if (collection.collection === collectAtual._id.toString()) {

                        collection.numberCollections = collection.numberCollections + 1;
                        existeCollect = true;
                    }
                }
                if (!existeCollect) {
                    let colecoesUnicas = [];
                    let nColecoesZona = 0;
                    for (const colecao of aux) {
                        const contentor = await container.findOne({ container_cod: colecao.container })
                        if (contentor.container_cod == req.body.id) {
                            let existe = false;
                            if (colecao.key != chaveUser._id) {
                                nColecoesZona = nColecoesZona + 1;
                            }
                            for (const chave of colecoesUnicas) {
                                if (chave == colecao.key) {
                                    existe = true;
                                }
                            }
                            if (!existe) {
                                colecoesUnicas.push(colecao.key)
                            }
                        }

                    }
                    collectionsList.push({ colecoesZona: nColecoesZona, colecoesUnicas: colecoesUnicas.length - 1, collection: collectAtual._id.toString(), massaCollect_kg: collectAtual.massaCollect_kg, numberCollections: 1, collectionDate: collectAtual.dateEndTime, totalCollections: aux.length });
                }
            }

        }
    }
    console.log(collectionsList)
    res.json({ first: firstCollect, last: lastCollect, collections: collectionsList });
});


router.post('/', async(req, res) => {


    try {
        const { token } = req.session
        const payload = jwt.verify(token, authToken.secret);
        const User = await user.findById(payload.id);

        if (!User) {
            return res.status(400).send("User not found");
        }

        if ((User.permission === 'view') || (User.permission === 'viewEmployee')) {
            return res.status(400).send("You are not authorized to do this");
        }

        const _id = uuidv4();
        const contColl = await containerCollection.create({...req.body, _id });
        return res.send({ contColl });


    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error creating new circuit' });
    }
});

// router.post('/create',async (req,res)=>{
//     try{


//        const containerCollect = new containerCollection({
//         key:req.body.key,
//         container:req.body.container,
//         collectionID:req.body.collectionID
//     });

//         const result =  await containerCollect.save() ;   

//         res.json({result});


//     }catch(err){
//         console.log("what2")
//         res.json({message:err})
//     }

// });

module.exports = router;