//? DTO stands for Data Transfer Object
// This is the expected format of a value in the data,
// which will transit across multiple parts of the program.
export class CreateGameDto {
    Rank: number;
    Name: string;
    Platform: string;
    Year: number;
    Genre: string;
    Publisher: string;
    NA_Sales: number;
    EU_Sales: number;
    JP_Sales: number;
    Other_Sales: number;
    Global_Sales: number;
}