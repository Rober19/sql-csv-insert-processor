# Install and use it

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2FRober19%2Fsql-csv-insert-processor%2Fbadge%3Fref%3Dmaster&style=flat-square)](https://actions-badge.atrox.dev/Rober19/sql-csv-insert-processor/goto?ref=master)

```
> npm i sql-csv-insert-processor
```

# Testing sql-csv-insert-processor

```ts
const SETUP: ProcessorSetup[] = [
  {
    result_file_name: 'exported/annotations/ann_box',
    laggards_file_name: 'exported/annotations/for_review_ann_box',
    fields: {
      attachment_url: 'image_url_address',
      instructions: 'details',
      with_labels: 'with_labels',
    },
    IS_INSERT_IGNORE: true,
    TABLE_NAME: 'ann_box',
    csv_file_path: './src/assets/Trainingset.ai - box annotation example - demo.csv',
    encoding: 'win1250',
    PreProcessor: [
      /**
       * @param {*} data represents current row data
       * @param {requestCallback} PushToResult Run the function which save the row data into first result file
       * @param {requestCallback} PushToLaggards Run the function which save the row data into first result file
       * @param {[]} currentResultArray Includes the curretly saved data (for results) to be passed to PostProcessor
       * @param {[]} currentLaggardArray Includes the curretly saved data (for laggards) to be passed to PostProcessor
       */
      (data, callbackSaveResult, callbackSaveLaggards, currentResultArray, currentLaggardArray) => {
        console.log(data);

        callbackSaveResult(data);
        callbackSaveLaggards(data);

        /* 
        if (currentResultArray.includes( ... )) {
          ...
         } 
         */

        return data;
      },
    ],
    PostProcessor: [   
      (arrayResult, arrayLaggards) => {
        // YOU CAN CHECK OR EDIT THEM BEFORE BUILDIND FILES

        return [arrayResult, arrayLaggards];
      },
    ],    
  },
];
```

convert

![image-20201121002652998](.github/assets/image-20201121002652998.png)

into this

```sql
INSERT IGNORE INTO ann_box (details,image_url_address,with_labels) VALUES
( "Draw a box around each car","https://i.imgur.com/OUyDzS2.jpg","TRUE" )
,( "Draw a box around each car","https://i.imgur.com/OUyDzS2.jpg","TRUE" )
,( "Draw a box around each device 2","https://i.imgur.com/ZhgjlpU.jpg","TRUE" )
,( "Draw a box around each device 3","https://i.imgur.com/ZhgjlpU.jpg","TRUE" )
,( "Draw a box around each device 4","https://i.imgur.com/ZhgjlpU.jpg","TRUE" )

```
