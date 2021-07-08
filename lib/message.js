export default class Message{
    #topic;
    #createdAt;
    #id;
    #status
    constructor(topic){
        this.#topic = topic;
        this.#id = Date.now();
        this.#createdAt = Date.now();
        this.#status = 0
    }
    /**
     * Getter function for message topic.
     */
    get topic(){
        return this.#topic;
    }
    /**
     * Getter function for message id.
     */
    get id() {
        return this.#id;
    }
    /**
     * Getter function for message created date.
     */
    get createdAt() {
        return this.#createdAt;
    }
    /**
     * Converts message object to string.
     * @returns Object representing message
     */
    toString() {
        return {id: this.#id, topic: this.#topic, createdAt: this.#createdAt, status: this.#status};
    }
    /**
     * Getter function for message status
     */
    get status(){
        return this.#status;
    }
    /**
     * Setter function for the status of the message.
     * @param value - The value of the status. 
     */
    set status(value){
        this.#status = value;
    }
}