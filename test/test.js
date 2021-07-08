import chai from 'chai'
import Broker from '../lib/broker';
import Message from '../lib/message'

let expect = chai.expect;
let message;
let broker;

describe("App Test", function () {
    before(()=>{
        message = new Message("orders.ShipPackage")
        broker = new Broker();    
    });

    describe('Broker Class', function(){
        it('should have task queue length of 0', function(){
           expect(broker.taskQueue.size).to.be.equal(0)
        });

        it('should have message queue length of 0', function(){
            expect(broker.queue.size).to.be.equal(0)
         });

         describe("receiveMessageFromProducer function", function(){
            it('should have message queue length of 1 after message added', function(){
                broker.receiveMessageFromProducer("orders.ShipPackage")
                expect(broker.queueSize).to.be.equal(1)
            });
         })

         describe("sendMessagesToConsumer function", function(){
            it('should send list containing 1 message to consumer 1', function(){
                let consumerId = 1;
                let list = [];
                list = broker.sendMessagesToConsumer(consumerId)
                expect(list.length).to.be.equal(1)
            });

            it('should send list containing 0 message to consumer 2', function(){
                let consumerId = 2;
                let list = [];
                list = broker.sendMessagesToConsumer(consumerId)
                expect(list.length).to.be.equal(0)
            });

            it('should have task queue length of 1', function(){
                expect(broker.taskQueue.size).to.be.equal(1)
             });
         })

         describe("receiveProcessedMessageFromConsumer function", function(){
            it('should remove messageid from message queue', function(){
                let consumerId = 1;
                const response = broker.receiveProcessedMessageFromConsumer(message.id, consumerId)
                expect(response).to.be.true;
                expect(broker.taskQueue.size).to.be.equal(0)
                expect(broker.queue.size).to.be.equal(0)
            });
         })
         
    });


    
    describe('Message Class', function(){
   
   
        it('should have message with property topic', function(){
            expect(message).to.have.property('topic');
            expect(message.topic).to.be.equal("orders.ShipPackage");
            
        });
    
        it('should have message with property status', function(){
            expect(message).to.have.property('status');
            expect(message.status).to.be.equal(0);
            expect(message.id).to.be.an('number')
        });
    
        it('should have message with property id', function(){
            expect(message).to.have.property('id');
            expect(message.id).to.be.greaterThan(0);
            expect(message.id).to.be.an('number')
        });
    
        it('should have message with property createdAt', function(){
            expect(message).to.have.property('createdAt');
        });
        
    })
    
})

