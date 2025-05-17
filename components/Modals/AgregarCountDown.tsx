import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  addToast,
} from "@heroui/react";
import AddCountDown3 from "../../src/components/AddCountdownv3.0";
export default function AgregarCountDown() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal
        className="bg-gray-800"
        size="2xl"
        isOpen={isOpen}
        scrollBehavior={"inside"}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar conteo regresivo
              </ModalHeader>
              <ModalBody className="px-4">
                {/* <CountDownForm /> */}
                <AddCountDown3 onOpenChange={onOpenChange} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Button onClick={onOpen} type="submit" color="secondary">
        Agregar contador
      </Button>
    </>
  );
}
