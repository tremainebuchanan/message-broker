import express from 'express';
import Broker from '../lib/broker';

const app = express();
const PORT = 3000;
let broker = new Broker();
app.use(express.json());

app.post('/producers', (req, res, next) => {
    const topic = req.body.topic;
    const message = broker.receiveMessageFromProducer(topic);
    res.json({confirmationId: message.id});
    next();
});

app.get('/consumers/:id', (req, res, next) => {
    const consumerId = req.params.id;
    const messages = broker.sendMessagesToConsumer(consumerId);
    res.json({'messages': messages});
    next();
});

app.post('/consumers/:id/:msgId', (req, res, next) => {
    const consumerId = req.params.id;
    const messageId = req.params.msgId;
    let response = {"message": `Message with id ${messageId} removed from queue.`}
    const isMessageRemoved = broker.receiveProcessedMessageFromConsumer(messageId, consumerId);
    if(!isMessageRemoved) return res.status(400).json({"message": `Unable to remove message with id ${messageId} from queue.`});
    return res.json(response);
});

app.listen(PORT, () => console.log(`Broker running on port ${PORT}`))