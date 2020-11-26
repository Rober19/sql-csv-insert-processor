

/**
 * 
 */
interface ProcessorSetup {
  result_file_name: string,
  laggards_file_name: string,
  /**
   * @param fields for rename or filter colums
   */
  fields?: Object|any,
  csv_file_path: string,
  /**
   * @param encoding format to decode .csv file
   */
  encoding: string | 'win1250',
  // >< ---------      SQL     ------------------
  TABLE_NAME: string,
  IS_INSERT_IGNORE: boolean,
  ON_DUPLICATED?: string,

  /**
 * @param data represents current row data
 * @param {requestCallback} PushToResult Run the function which save the row data into first result file
 * @param PushToLaggards Run the function which save the row data into first result file
 */
  PreProcessor: Array<(data: any, PushToResult: Function, PushToLaggards: Function, current_array_data: any[], current_array_data_laggard: any[]) => object | string | number | boolean>,
  PostProcessor: Array<(final_array_data: any[], final_array_data_laggard: any[]) => [final_array_data: any[], final_array_data_laggard: any[]]>,

}

declare module 'sql-csv-insert-processor' {
  export function Proccessor(
    data: ProcessorSetup
  ): void;
}

