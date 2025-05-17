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
import { FormularioRegistro } from "../../components/Forms/FormularioRegistro";
import useUser from "../../context/useUser";
import AgregarCountDown from "../../components/Modals/AgregarCountDown";
import { closeLog } from "../../db/functions";
import { useRouter } from "next/router";
export default function NavView() {
  const router = useRouter();
  const { isLogin, user, reloadData, setReloadCounts, reloadCounts } =
    useUser();
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
      <div>
        <div className="border-b-[1px] border-[#414141c7] h-[52px] items-center flex justify-between">
          <div className="relative flex items-center mb-[-4px]">
            <p className="font-bold text-[1.2rem] px-2">Countdown</p>
            <AgregarCountDown />
          </div>

          {isLogin ? (
            <>
              {" "}
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="ghost">
                    {" "}
                    <div className="flex gap-2 items-center">
                      {isLogin && <>{user?.name}</>}
                      <Avatar size="sm" showFallback />
                    </div>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="new">Editar infomación</DropdownItem>
                  <DropdownItem key="copy">Ver mis contadores</DropdownItem>
                  <DropdownItem key="edit">Edit file</DropdownItem>
                  <DropdownItem
                    onClick={async () => {
                      
                      closeLog();
                      reloadData();
                      router.reload();
                    }}
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Cerrar sesión
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          ) : (
            <>
              {" "}
              <div
                onClick={onOpen}
                className="border-2 rounded-xl px-3 py-1 border-[#414141c7] mx-2 flex gap-2 items-center"
              >
                Registrarse
                <Avatar size="sm" showFallback />
              </div>
            </>
          )}

          {/* <p onClick={()=>setshowLogin(true)} className="pr-3">Log in</p> */}
          {/* <div class="nav-button-burguer relative flex flex-col space-y-2">
        <span id="nav-1-button" class="nav-button "></span>
        <span id="nav-2-button" class="nav-button"></span>
        <span id="nav-3-button" class="nav-button"></span>
    </div>  */}
        </div>
      </div>
    </>
  );
}
