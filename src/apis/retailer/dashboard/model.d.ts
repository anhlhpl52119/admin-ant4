import {} from "@/enums/request.enum";
export {};

declare global {
  namespace API {
    type GetDashBoardChartInfoRequestParams = {
      period: 'month' | 'day' | 'year';
      start_date: number;
      end_date: number;
    };
    type GetDashBoardTotalAmountRequestParams = {
      start_date: number;
      end_date: number;
    };
  }
}
