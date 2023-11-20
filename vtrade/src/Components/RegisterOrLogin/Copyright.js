import moment from "moment";

export function Copyright() {
  return (
    <div className="text-gray-300 text-sm flex flex-row justify-center">
      <div className="text-center text-gray-500 text-sm">
        &copy; {new moment().year()} VTRADE
      </div>
    </div>
  );
}
