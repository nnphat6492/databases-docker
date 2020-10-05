const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})



const producer = kafka.producer()
async function test() {
    await producer.connect()
    await producer.send({
      topic: 'test-topic',
      messages: [
        { value: 'Hello KafkaJS user!' },
      ],
    })

    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'Hello KafkaJS user1!' },
        ],
    })
      await producer.send({
        topic: 'test-topic',
        messages: [
          { value: 'Hello KafkaJS user2!' },
        ],
      })
    await producer.disconnect()
    
    const consumer = kafka.consumer({ groupId: 'test-group-1' })
    
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
            partition,
          value: message.value.toString(),
        })
      },
    })
}

test()