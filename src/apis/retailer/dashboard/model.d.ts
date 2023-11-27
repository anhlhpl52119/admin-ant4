import {} from "@/enums/request.enum";
export {};

declare global {
  namespace API {
    type GetDashBoardChartInfoRequestBody = {
      period: 'month' | 'day' | 'year';
      start_date: number;
      end_date: number;
    };
    type GetDashBoardTotalAmountRequestBody = {
      start_date: number;
      end_date: number;
    };
  }
}
