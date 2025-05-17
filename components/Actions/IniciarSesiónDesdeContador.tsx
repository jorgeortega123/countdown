import { Alert } from "@heroui/react";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { FormularioRegistro } from "../Forms/FormularioRegistro";
export default function IniciarSesiónDesdeContador() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Modal
        size="2xl"
        isOpen={isOpen}
        scrollBehavior={"inside"}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Login registro
              </ModalHeader>
              <ModalBody className="px-0">
                <FormularioRegistro onOpenChange={onOpenChange} />
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
      <Alert
        variant="faded"
        color="secondary"
        onClick={onOpenChange}
        title={"Inicia sesión para mostrar tus contadores personalizados"}
        description={"Da click aqui para iniciar el registro"}
      ></Alert>
    </>
  );
}
