import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ViewStyle } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";

// Define supported file types
type FileType = "pdf" | "jpg" | "jpeg" | "png" | "doc" | "docx";

// Define the file object structure
interface SelectedFile {
  name: string;
  size: number;
  mimeType: string;
  uri: string;
}

// Component props interface
interface DocumentUploadInputProps {
  /** Label text displayed above the upload button */
  label?: string;

  /** Callback function called when a file is selected */
  onFileSelect?: (file: SelectedFile) => void;

  /** Callback function called when a file is removed */
  onFileRemove?: () => void;

  /** Maximum file size in bytes (default: 1MB) */
  maxFileSize?: number;

  /** Array of accepted file extensions */
  acceptedTypes?: FileType[];

  /** Whether the field is required (shows asterisk) */
  required?: boolean;

  /** Custom style for the container */
  style?: ViewStyle | string;

  /** Whether the input is disabled */
  disabled?: boolean;

  /** Initial file if component is controlled */
  initialFile?: SelectedFile | null;
}

// File size units for formatting
const FILE_SIZE_UNITS = ["Bytes", "KB", "MB", "GB"] as const;

// MIME type mapping for file extensions
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
  maxFileSize = 1048576, // 1MB in bytes
  acceptedTypes = ["pdf", "jpg", "png"],
  required = false,
  style,
  disabled = false,
  initialFile = null,
}) => {
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(
    initialFile
  );
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Format file size from bytes to human readable format
   */
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + FILE_SIZE_UNITS[i]
    );
  };

  /**
   * Get accepted file types as display string
   */
  const getAcceptedTypesText = (): string => {
    return acceptedTypes.map((type) => type.toUpperCase()).join(" / ");
  };

  /**
   * Get file extension from filename
   */
  const getFileExtension = (filename: string): string => {
    return filename.split(".").pop()?.toLowerCase() || "";
  };

  /**
   * Validate selected file against size and type constraints
   */
  const validateFile = (file: DocumentPicker.DocumentPickerResult): boolean => {
    if (!file.assets || file.assets.length === 0) {
      Alert.alert("Error", "No file selected");
      return false;
    }

    const asset = file.assets[0];

    // Check file size
    if (asset.size && asset.size > maxFileSize) {
      Alert.alert(
        "File Too Large",
        `File size must be less than ${formatFileSize(maxFileSize)}`
      );
      return false;
    }

    // Check file type
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

  /**
   * Handle file selection from document picker
   */
  const handleFileSelect = async (): Promise<void> => {
    if (disabled) return;

    setLoading(true);

    try {
      // Get accepted MIME types
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

        // Call parent callback if provided
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

  /**
   * Handle file removal
   */
  const handleRemoveFile = (): void => {
    setSelectedFile(null);
    if (onFileRemove) {
      onFileRemove();
    }
  };

  const isSelected = selectedFile !== null;

  return (
    <View className={`mb-4 ${typeof style === "string" ? style : ""}`}>
      {label && (
        <Text className='mb-2 text-base font-medium text-black'>
          {label}
          {required && <Text className='text-red-500'> *</Text>}
        </Text>
      )}

      <TouchableOpacity
        className={`
           bg-grey-200 rounded-xl p-4 border-2 border-dashed min-h-20
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
        <View className='flex-col items-center flex-1 gap-4'>
          <View className="p-3 rounded-full bg-primary/20">
            <Ionicons name='camera' size={24} className="!text-primary" />
          </View>
          <View className='flex-1'>
            <Text
              className={`
              text-base text-center mb-1 font-medium
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
                  className='mb-1 text-sm font-medium text-green-600'
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
              <Text className='text-base font-bold text-white'>×</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export { FileInput };
