import Message from './message';
export default class Broker{
    #queue
   #taskQueue
   #taskQueueSize
   #queueSize
   constructor(){
       this.#queue = new Map();
       this.#taskQueue = new Map();
   }

   get queue(){
       return this.#queue;
   }

   get taskQueue(){
       return this.#taskQueue;
   }

   get queueSize(){
       return this.#queue.size;
   }

   get taskQueueSize(){
       return this.#taskQueueSize.size;
   }
   /**
    * Receives message from producer and adds to 
    * message queue.
    * @param {string} topic - The topic of the message 
    */
   receiveMessageFromProducer(topic){
       let message = new Message(topic)
       this.#queue.set(message.id, message.toString());
       return message;
   }
   /**
    * Processes message from consumer
    * @param {int} messageId - Unique id of message
    * @param {int} consumerId - Unique id of consumer
    * @returns 
    */
   receiveProcessedMessageFromConsumer(messageId, consumerId){
       let msgId = parseInt(messageId);
       let isMessageRemoved = true;
       let numberOfMessages = this.#taskQueue.get(consumerId);
       if(this.#queue.has(msgId)){
        this.#queue.delete(msgId)
        numberOfMessages--;
        numberOfMessages === 0 ? this.#taskQueue.delete(consumerId) : this.#taskQueue.set(consumerId, numberOfMessages)
       }else{
           isMessageRemoved = false;
       }
       return isMessageRemoved;
   }
   /**
    * Determines the visibility of a message given a time.
    * @param {Date} timeCreated 
    * @returns 
    */
    isMessageVisible(timeCreated){
        const diffInSeconds = (Math.abs(Date.now() - timeCreated)/1000);
        return diffInSeconds < 30;
    }
    /**
     * Sends a list of messages to a consumer based on visibility.
     * @param {int} consumerId 
     * @returns 
     */
   sendMessagesToConsumer(consumerId){
       if(this.#queue.size == 0) return [];
       let list = [];
       let visibilty = true;
       if(this.#taskQueue.size >= 1){
            visibilty = false;
            list = this.getMessagesByVisibility(visibilty);
       }else{
            list = this.getMessagesByVisibility(visibilty);
            this.#taskQueue.set(consumerId, list.length);
       }
       return list
   }
   /**
    * Gets a list of messages from the queue based on visibility.
    * @param {bool} visibilty - true if visible, false otherwise.
    * @returns 
    */
   getMessagesByVisibility(visibilty){
       let list = [];
    for (let [key, message] of this.#queue) {
        if(this.isMessageVisible(message.createdAt) === visibilty){
            this.#queue.set(key, message);
            list.push(message);
        }
    }
    return list;
   }
}