export default function OrderHistory() {
  return (
    <div className="w-full max-w-md p-4 border border-gray-200 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 ">
          나의 주문내역
        </h5>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="py-3">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate ">
                  2023.06.20
                </p>
                <p className="text-sm text-gray-500 truncate ">
                  아이스아메리카노
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                4500원
              </div>
            </div>
          </li>
          <li className="py-3">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate ">
                  2023.07.04
                </p>
                <p className="text-sm text-gray-500 truncate ">케이크</p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                6000원
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
