import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View, ViewStyle } from "react-native";

type FileType = "pdf" | "jpg" | "jpeg" | "png" | "doc" | "docx";

interface SelectedFile {
  name: string;
  size: number;
  mimeType: string;
  uri: string;
}

    
interface DocumentUploadInputProps {
  label?: string;
  onFileSelect?: (file: SelectedFile) => void;
  onFileRemove?: () => void;
  maxFileSize?: number;
  acceptedTypes?: FileType[];
  required?: boolean;
  style?: ViewStyle | string;
  disabled?: boolean;
  initialFile?: SelectedFile | null;
  value?: SelectedFile | null;
}

const FILE_SIZE_UNITS = ["Bytes", "KB", "MB", "GB"] as const;

const MIME_TYPE_MAP: Record<FileType, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const FileInput: React.FC<DocumentUploadInputProps> = ({
  label,
  onFileSelect,
  onFileRemove,
  maxFileSize = 1048576,
  acceptedTypes = ["pdf", "jpg", "png"],
  required = false,
  style,
  disabled = false,
  initialFile = null,
  value,
}) => {
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(
    initialFile
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedFile(value);
    }
  }, [value]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + FILE_SIZE_UNITS[i]
    );
  };

  const getAcceptedTypesText = (): string => {
    return acceptedTypes.map((type) => type.toUpperCase()).join(" / ");
  };

  const getFileExtension = (filename: string): string => {
    return filename.split(".").pop()?.toLowerCase() || "";
  };

  const validateFile = (file: DocumentPicker.DocumentPickerResult): boolean => {
    if (!file.assets || file.assets.length === 0) {
      Alert.alert("Error", "No file selected");
      return false;
    }

    const asset = file.assets[0];

    if (asset.size && asset.size > maxFileSize) {
      Alert.alert(
        "File Too Large",
        `File size must be less than ${formatFileSize(maxFileSize)}`
      );
      return false;
    }

    const fileExtension = getFileExtension(asset.name);
    if (!acceptedTypes.includes(fileExtension as FileType)) {
      Alert.alert(
        "Invalid File Type",
        `Please select a ${getAcceptedTypesText()} file`
      );
      return false;
    }

    return true;
  };
    
  const handleFileSelect = async (): Promise<void> => {
    if (disabled) return;

    setLoading(true);

    try {
      const mimeTypes = acceptedTypes
        .map((type) => MIME_TYPE_MAP[type])
        .filter(Boolean);

      const result = await DocumentPicker.getDocumentAsync({
        type: mimeTypes.length > 0 ? mimeTypes : "*/*",
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && validateFile(result)) {
        const asset = result.assets[0];
        const file: SelectedFile = {
          name: asset.name,
          size: asset.size || 0,
          mimeType: asset.mimeType || "",
          uri: asset.uri,
        };

        setSelectedFile(file);

        if (onFileSelect) {
          onFileSelect(file);
        }
      }
    } catch (error) {
      console.error("Document picker error:", error);
      Alert.alert("Error", "Failed to select file");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = (): void => {
    setSelectedFile(null);
    if (onFileRemove) {
      onFileRemove();
    }
  };

  const isSelected = selectedFile !== null;

  return (
    <View className={`${typeof style === "string" ? style : ""}`}>
      {label && (
        <Text className='mb-2 text-base text-black font-interMedium'>
          {label}
          {required && <Text className='text-red-500'> *</Text>}
        </Text>
      )}

      <TouchableOpacity
        className={`
           bg-grey-200 rounded-xl p-4 border-2 border-dashed
          ${
            isSelected
              ? "border-green-500 bg-green-50 border-solid"
              : "border-grey-300 bg-grey-200"
          }
          ${disabled ? "bg-grey-0 border-grey-300" : ""}
        `}
        onPress={handleFileSelect}
        disabled={disabled || loading}
        activeOpacity={0.7}
      >
        <View className='flex-col items-center gap-4'>
          <View className="p-3 rounded-full bg-primary/20">
            <Ionicons name='camera' size={24} className="!text-primary" />
          </View>
          <View>
            <Text
              className={`
              text-base text-center mb-1 font-interMedium
              ${
                isSelected
                  ? "text-green-600"
                  : disabled
                    ? "text-grey-200"
                    : "text-primary"
              }
            `}
            >
              {loading
                ? "Selecting..."
                : isSelected
                  ? "File Selected"
                  : <> Click here <Text className='text-slate-600'>to upload your files</Text></>}
            </Text>

            <Text
              className={`
              text-sm 
              ${disabled ? "text-gray" :"text-grey-600"}
            `}
            >
              Supported Format:({getAcceptedTypesText()}) of {formatFileSize(maxFileSize)} max.
            </Text>

            {isSelected && selectedFile && (
              <View className='mt-2'>
                <Text
                  className='mb-1 text-sm text-green-600 font-interMedium'
                  numberOfLines={1}
                >
                 {selectedFile.name}
                </Text>
                <Text className='text-xs text-gray-600'>
                  {formatFileSize(selectedFile.size)}
                </Text>
              </View>
            )}
          </View>

          {isSelected && !disabled && (
            <TouchableOpacity
              className='items-center justify-center w-6 h-6 ml-2 bg-red-500 rounded-full'
              onPress={handleRemoveFile}
              activeOpacity={0.7}
            >
              <Text className='text-base text-white font-interBold'>×</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export { FileInput };

