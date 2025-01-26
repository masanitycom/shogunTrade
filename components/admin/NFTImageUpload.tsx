import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"

const nftTypes = [
  "SHOGUN NFT300",
  "SHOGUN NFT500",
  "SHOGUN NFT1000",
  "SHOGUN NFT3000",
  "SHOGUN NFT5000",
  "SHOGUN NFT10000",
  "SHOGUN NFT30000",
  "SHOGUN NFT100000",
]

export function NFTImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedNFTType, setSelectedNFTType] = useState<string>("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !selectedNFTType) {
      toast({
        title: "エラー",
        description: "ファイルとNFTタイプを選択してください。",
        variant: "destructive",
      })
      return
    }

    // TODO: Implement actual file upload logic
    // This is a placeholder for the actual upload process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "アップロード成功",
      description: `${selectedNFTType}の画像 ${selectedFile.name} がアップロードされました。`,
    })

    setSelectedFile(null)
    setSelectedNFTType("")
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="nft-type">NFTタイプ</Label>
        <Select value={selectedNFTType} onValueChange={setSelectedNFTType}>
          <SelectTrigger>
            <SelectValue placeholder="NFTタイプを選択" />
          </SelectTrigger>
          <SelectContent>
            {nftTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Input type="file" onChange={handleFileChange} accept="image/*" />
      <Button onClick={handleUpload} disabled={!selectedFile || !selectedNFTType}>
        アップロード
      </Button>
    </div>
  )
}

