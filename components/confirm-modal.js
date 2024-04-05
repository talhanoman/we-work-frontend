import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function ConfirmModal({
  showConfirmModal,
  setShowConfirmModal,
  message,
}) {
  return (
    <Transition appear show={showConfirmModal?.showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          null;
        }}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl border border-gray-200 bg-white p-6 text-left align-middle shadow-xl transition-all space-y-4">
                <Dialog.Title
                  as="h3"
                  className="text-lg-semibold text-gray-900"
                >
                  {message}
                </Dialog.Title>

                <div className="flex justify-between gap-3">
                  <button
                    className="h-11 text-md-semibold flex items-center justify-center flex-1 border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 outline-none shadow-xs"
                    onClick={() => setShowConfirmModal({...showConfirmModal, showModal: false, option: "cancel"})}
                  >
                    Cancel
                  </button>
                  <button className="h-11 text-md-semibold flex items-center justify-center flex-1 border border-primary-600 bg-primary-600 rounded-lg text-white py-2.5 outline-none shadow-xs"
                    onClick={() => setShowConfirmModal({...showConfirmModal, showModal: false, option: "confirm"})}
                  >
                    Confirm
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
