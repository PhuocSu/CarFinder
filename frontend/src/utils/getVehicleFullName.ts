import { Vehicle } from "@/app/api/listPage/useVehiclesQuery";

export const getVehicleFullName = (car: any) =>
    `${car.subModel?.model?.modelName} ${car.subModel?.subModelName} ${car.brandName}`;