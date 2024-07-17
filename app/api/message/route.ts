export async function POST(req: Request) {
  console.log("REQ", req.body);

  // post message to API
  // the data will be transfer with stream

  // extract the data from the request
  // validate the data because it's from the client and we want to make sure
  // validate in an array since we are going to sent into chunks
  // use unshift to put the outboundmessage into the front of the array
  //
  // return response
  // const stream = await OpenAIStream(payload)
  // return new Response(stream) => this is from next js new Response. read the docs
}
