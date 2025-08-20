"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import PageLayout from "@/components/PageLayout";

interface PostFormData {
  title: string;
  content: string;
  author: string;
}

export default function NewPostPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>();

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await api.createPost(data);
      setShowSuccessModal(true);
      reset();
      
      // Redirect to posts list after 3 seconds
      setTimeout(() => {
        router.push('/posts');
      }, 3000);
      
    } catch (error) {
      console.error("Failed to create post:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Failed to create post"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageLayout title="Přidání článku">
        <div className="mb-8">
          <div className="mb-48"></div> {/* Spacer to maintain layout */}
        </div>
        <div className="container mx-auto max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Titulek *
            </label>
            <input
              type="text"
              id="title"
              {...register("title", {
                required: "Titulek je povinný",
                minLength: {
                  value: 3,
                  message: "Titulek musí mít alespoň 3 znaky",
                },
              })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-black focus:outline-none bg-white text-gray-900 font-lora"
              placeholder="Zadejte titulek článku"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Obsah *
            </label>
            <textarea
              id="content"
              rows={8}
              {...register("content", {
                required: "Obsah je povinný",
                minLength: {
                  value: 10,
                  message: "Obsah musí mít alespoň 10 znaků",
                },
              })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-black focus:outline-none bg-white text-gray-900 resize-vertical font-lora"
              placeholder="Zadejte obsah článku"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">
                {errors.content.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Autor *
            </label>
            <input
              type="text"
              id="author"
              {...register("author", {
                required: "Autor je povinný",
              })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-black focus:outline-none bg-white text-gray-900 font-lora"
              placeholder="Zadejte jméno autora"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">
                {errors.author.message}
              </p>
            )}
          </div>

          {submitError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{submitError}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-16 py-4 mt-4 bg-[#343A40] text-white rounded-lg text-sm font-medium hover:bg-[#292e33] hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Ukládá se..." : "Odeslat"}
            </button>
          </div>
        </form>
        </div>
      </PageLayout>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-lg">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Článek byl vytvořen!
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Přesměrováváme vás na seznam článků...
              </p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#343A40]"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
