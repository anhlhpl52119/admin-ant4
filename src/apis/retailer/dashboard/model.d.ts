import {} from "@/enums/request.enum";
export {};

declare global {
  namespace API {
    type GetDashboardInfoRequestBody = {
      period: 'month' | 'day' | 'year';
      start_date: string;
      end_date: string;
    };
  }
}
