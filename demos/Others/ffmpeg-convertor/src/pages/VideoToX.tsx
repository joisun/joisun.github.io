import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  fps: z.coerce
    .number()
    .lte(120, {
      message: "帧率必须小于120.",
    })
    .gte(10, { message: "帧率必须大于10." }),
  width: z.coerce
    .number()
    .lte(5000, {
      message: "宽度必须小于5000.",
    })
    .gte(1, { message: "宽度必须大于0." }),
  loop: z.coerce.number().gte(0, { message: "循环次数必须大于0." }),
  bitrate: z.string().min(0, { message: "比特率选择不可为空." }),
  compression: z.coerce
    .number()
    .lte(100, {
      message: "压缩级别必须小于100.",
    })
    .gte(0, { message: "压缩级别必须大于0." }),

  select: z.coerce.number(),
  pix_fmt: z.string().optional(),
  filetype: z.string(),
});

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import BiteRateSelector from "@/components/bit-rate-selector";
import { Slider } from "@/components/ui/slider";
import ColorSpaceSelector from "@/components/color-space-selector";
import { generateFFmpegCommand } from "@/lib/utils";
import { SVGProps, useState } from "react";
import { Label } from "@/components/ui/label";
import FileTypeSelector from "@/components/file-type-selector";
import Dropzone from "@/components/DropZone";
import VideoClipper from "@/components/VideoClipper";
// export default function VideoToGif(){
//     return <>
//     Video To Gif
//     <div>
//     帧率 1-120
//     宽度  0
//     循环控制  0
//     视频截取
//     比特率控制 500k-5m
//     压缩级别 0-100 （推荐70）
//     选择性帧提取 取决需求，通常小于 30， 默认3
//     颜色空间转换 gray monob pal8 rgb8, rgb24, rgb32, rgb48be, rgb48le rgb8 适合大多数 GIF
//     视频速度调整 0.1-10（0.1 为 10 倍速，10 为 1/10 速度）
//     </div>
//     </>
// }

export default function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fps: 30,
      width: 480,
      loop: 0,
      bitrate: "800k",
      compression: 10,
      select: 1,
      pix_fmt: "yuv420p",
      filetype: "mp4",
    },
  });
  const [command, setCommand] = useState("");
  const [files, setFiles] = useState<string[]>([]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const command = generateFFmpegCommand(values);
    setCommand(command);
  }

  return (
    <>
      <div className="file mb-8">
        {
          files[0] 
          ? 
            <VideoClipper src={files[0]}>
              <button onClick={()=>setFiles([])} className="w-12 h-12 bg-black/20 hover:bg-black/30 backdrop-blur-xl absolute hover:scale-110 transition-all top-2 right-2 flex justify-center items-center rounded-lg"><MingcuteCloseFill className="text-3xl"/></button>
            </VideoClipper>
            : <Dropzone
              onChange={setFiles}
              className="w-full h-24 my-12 flex items-center justify-center"
              fileExtension="video/*"
            ></Dropzone>
        }
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-4"
        >
          <FormField
            control={form.control}
            name="fps"
            render={({ field }) => (
              <FormItem>
                <FormLabel>帧率</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="" {...field} />
                </FormControl>
                <FormDescription>控制输出资源的帧率</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>宽度</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="" {...field} />
                </FormControl>
                <FormDescription>控制输出资源的尺寸</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="loop"
            render={({ field }) => (
              <FormItem>
                <FormLabel>循环次数</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  控制输出资源的循环播放次数，0为无限循环
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bitrate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>比特率</FormLabel>
                <FormControl>
                  <BiteRateSelector
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormDescription>
                  控制输出资源的循环播放次数，0为无限循环
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="compression"
            render={({ field }) => (
              <FormItem>
                <FormLabel>压缩级别 {field.value}</FormLabel>
                <FormControl>
                  <Slider
                    id="compression"
                    max={100}
                    min={0}
                    defaultValue={[field.value]}
                    step={1}
                    onValueChange={field.onChange}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="select"
            render={({ field }) => (
              <FormItem>
                <FormLabel>抽帧 {field.value}</FormLabel>
                <FormControl>
                  <Slider
                    id="select"
                    max={60}
                    min={1}
                    defaultValue={[field.value]}
                    step={1}
                    onValueChange={field.onChange}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pix_fmt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>颜色空间转换</FormLabel>
                <FormControl>
                  <ColorSpaceSelector
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormDescription>
                  控制输出资源的循环播放次数，0为无限循环
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="filetype"
            render={({ field }) => (
              <FormItem>
                <FormLabel>生成文件类型</FormLabel>
                <FormControl>
                  <FileTypeSelector
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button className="mt-12" onClick={form.handleSubmit(onSubmit)}>
        仅生成指令
      </Button>
      <Button className="mt-12" onClick={form.handleSubmit(onSubmit)}>
        生成指令并开始转换
      </Button>
      <div className="mt-4">
        <Label>生成指令:</Label>
        <pre className="mt-4 whitespace-normal">{command}</pre>
      </div>
    </>
  );
}



function MingcuteCloseFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z"></path></g></svg>
  )
}