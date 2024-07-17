// import

//type for chatGPTAgent

// type for ChatGPTMessage

// function for openAIStream taking payload
// encoder decoder
// send to openai API, POST method with the payload, dont forget openai API key
// stream, change the response to stream
//  async start
//    function onParse event as argument
//       check if event type is "event"
//        extract data
//        if data is "[DONE]" then close the stream and return
//        in try catch block, try block - parse data to json, get text (see openai API docs)
//        if counter less than 2 and is empty (use regex) or data is empty, do nothing
//        and queue the data with encoder - encode the data
//        controller enqueue the data
//        counter increment
//        catch error in catch block, controller error

//        parser = createParser(onParse)
//        for loop takeout the chunks
//        parser feed - decode chunk
//   return the stream
