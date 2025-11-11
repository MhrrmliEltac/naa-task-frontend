import { Box, Card, CardContent, Modal } from "@mui/material";
import CancelButton from "./modal/CancelButton";
import "react-quill-new/dist/quill.snow.css";
import Button from "./Button";
import HTMLContentSection from "./modal/HTMLContentSection";
import LanguageSelector from "./modal/LanguageSelector";
import ModalHeader from "./modal/ModalHeader";
import FormInput from "./modal/FormInput";
import { useForm } from "react-hook-form";
import CategorySelector from "./modal/CategorySelector";
import CoverImageUpload from "./modal/CoverImageUpload";
import MultipleImage from "./modal/MultipleImage";
import { useEffect, useMemo, useState } from "react";
import type { ContentModalProps } from "../types/modal.types";
import { Content } from "../types/content.types";
import { useCreateContent, useUpdateContent } from "../hooks/useContent";
import ActionModal from "./ActionModal";

const ContentModal = ({
  open,
  handleClose,
  showItem,
  refetch,
}: ContentModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState(false);
  const [steps, setSteps] = useState<number>(1);

  const handleSuccessModalClose = () => {
    setSuccessModal(false);
    refetch();
  };

  const createContent = useCreateContent({
    onSuccess: () => {
      setLoading(false);
      setSuccessModal(true);
      handleClose();
    },
    onError: (error) => alert(`Error: ${error.message}`),
  });

  const updateContent = useUpdateContent({
    onSuccess: () => {
      setLoading(false);
      setSuccessModal(true);
      handleClose();
    },
    onError: (error) => alert(`Error: ${error.message}`),
  });

  const defaultValues: Partial<Content> = useMemo(
    () => ({
      _id: showItem?._id,
      title: showItem?.title || "",
      slug: showItem?.slug || "",
      category: showItem?.category || "",
      coverImage: showItem?.coverImage || null,
      htmlContent: showItem?.htmlContent || "",
      activeLang: showItem?.activeLang || "EN",
      galleryImages: showItem?.galleryImages || [],
    }),
    [showItem]
  );

  const { register, handleSubmit, setValue, watch, reset } = useForm<Content>({
    defaultValues,
  });

  const activeLang = watch("activeLang");
  const category = watch("category");
  const htmlContent = watch("htmlContent");

  useEffect(() => {
    reset(defaultValues);
  }, [showItem, open, reset, defaultValues]);

  const onSubmit = (data: Content) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("id", data._id);
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("category", data.category);
    formData.append("htmlContent", data.htmlContent);
    formData.append("activeLang", data.activeLang);

    if (data.coverImage) {
      formData.append("coverImage", data.coverImage);
    }

    if (data.galleryImages && data.galleryImages.length > 0) {
      data.galleryImages.forEach((file) =>
        formData.append("galleryImages", file)
      );
    }

    if (showItem?._id) {
      updateContent.mutate(formData);
    } else {
      createContent.mutate(formData);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              padding: "36px",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.09)",
              maxWidth: "728px",
              maxHeight: "95vh",
              height: "100%",
              width: "100%",
              backgroundColor: "white",
              position: "relative",
              overflowY: "auto",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Box sx={{ position: "absolute", top: 5, right: 15 }}>
              <CancelButton handleClose={handleClose} />
            </Box>

            <Card
              sx={{
                maxWidth: "656px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "none",
                height: steps > 1 ? "100%" : null,
              }}
            >
              <LanguageSelector
                activeLang={activeLang}
                onLanguageChange={(lang) => setValue("activeLang", lang)}
              />

              <ModalHeader
                title={
                  showItem
                    ? "Edit News / Announcement"
                    : "Create News / Announcement"
                }
                step={steps}
                totalSteps={2}
              />

              <form
                className="w-full flex flex-col gap-5 h-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                {steps === 1 ? (
                  <>
                    <div className="flex flex-col gap-3">
                      <FormInput
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Enter title"
                        register={register("title")}
                      />

                      <FormInput
                        id="slug"
                        name="slug"
                        label="Slug"
                        type="text"
                        placeholder="naa.edu.az/"
                        register={register("slug")}
                      />
                    </div>

                    <CategorySelector
                      selectedCategory={category}
                      onCategoryChange={(cat) => setValue("category", cat)}
                    />

                    <CoverImageUpload
                      onFileChange={(files) => setValue("coverImage", files)}
                      src={showItem?.coverImage as string}
                    />

                    <CardContent className="border border-[#F7F7F7] shadow-sidebar rounded-xl flex flex-col gap-3">
                      <p className="text-[#0A0A0A] font-medium text-[14px]">
                        HTML Content
                      </p>
                      <HTMLContentSection
                        value={htmlContent}
                        setValue={(val: string) => setValue("htmlContent", val)}
                      />
                    </CardContent>

                    <Button
                      btnText="Next"
                      bgColor="bg-[#243C7B]"
                      onClick={() => setSteps(2)}
                    />
                  </>
                ) : (
                  <div className="flex flex-col justify-between h-full">
                    <CardContent className="border border-[#F7F7F7] shadow-sidebar rounded-xl flex flex-col gap-3">
                      <p className="text-[#0A0A0A] font-medium text-[14px]">
                        Gallery Images
                      </p>
                      <MultipleImage
                        galleryImages={showItem?.galleryImages as string[]}
                        onFilesChange={(files) =>
                          setValue("galleryImages", files)
                        }
                      />
                    </CardContent>

                    <div className="flex justify-between items-center px-8 py-5 border border-[#F7F7F7] rounded-xl shadow-sidebar">
                      <div>
                        <Button
                          btnText="Cancel"
                          bgColor="transparent"
                          textColor="#6B7280"
                          onClick={handleClose}
                        />
                      </div>
                      <div
                        role="button"
                        onClick={handleSubmit(onSubmit)}
                        className="bg-[#243C7B] rounded-xl px-8 py-2"
                      >
                        <Button
                          btnText={
                            loading
                              ? showItem
                                ? "Updating..."
                                : "Creating..."
                              : showItem
                              ? "Update"
                              : "Submit"
                          }
                          bgColor="bg-[#243C7B]"
                          textColor="text-white"
                          onClick={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </Card>
          </Box>
        </Box>
      </Modal>

      <ActionModal
        action={showItem?._id ? "Edit" : "Add"}
        handleClose={handleSuccessModalClose}
        open={successModal}
      />
    </>
  );
};

export default ContentModal;
