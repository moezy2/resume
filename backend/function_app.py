import azure.functions as func
import json
import logging

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="GetResumeCounter")
@app.table_input(arg_name="inputTable", 
                table_name="Counter", 
                partition_key="1", 
                row_key="1", 
                connection="CosmosDbConnectionString")
@app.table_output(arg_name="outputTable", 
                 table_name="Counter", 
                 connection="CosmosDbConnectionString")
def GetResumeCounter(req: func.HttpRequest, inputTable, outputTable) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        # 1. Parse the existing data from Cosmos DB
        data = json.loads(inputTable)
        entity = data[0] if isinstance(data, list) else data

        # 2. Increment the count
        current_count = int(entity.get('count', 0))
        new_count = current_count + 1
        
        # 3. Update the count in the object
        entity['count'] = new_count
        
        # 4. IMPORTANT: We add this 'ETag' to tell Azure we are UPDATING the existing row
        # This prevents the 'EntityAlreadyExists' error
        entity['odata.etag'] = "*" 
        
        # 5. Save the updated row back to the database
        outputTable.set(json.dumps(entity))

        return func.HttpResponse(
            body=json.dumps({"count": new_count}),
            mimetype="application/json",
            status_code=200
        )

    except Exception as e:
        logging.error(f"Error: {str(e)}")
        return func.HttpResponse(f"Error: {str(e)}", status_code=500)