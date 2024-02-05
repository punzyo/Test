const express = require('express');
const router = express.Router();
const {data} = require('../data/flasgcardData.json');
const {cards} = data;

router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const flashcardId = Math.floor( Math.random() * numberOfCards );
    res.redirect(`/cards/${flashcardId}`)
});
router.get('/:id', (req, res) => {
    const {side} = req.query;
    const {id} = req.params;

    if(!side){
        return res.redirect(`/cards/${id}?side=question`)
    }
    const name = req.cookies.username;
    const text = cards[id][side];
    const {hint} = cards[id];
    const templateData = {id, text, name};
    if(side ==='question') { //只有問問題的時候才給提示，解答的時候就不要提示
        templateData.hint = hint
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    }
    else if (side === 'answer') {
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }
    res.render('card', templateData);
   // res.render('card', { prompt: cards[req.params.id].question, hint: cards[req.params.id].hint });
});
module.exports=router