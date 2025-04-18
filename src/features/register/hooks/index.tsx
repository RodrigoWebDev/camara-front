import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { parse, isValid } from "date-fns";
import { cpf } from "cpf-cnpj-validator"
import { useMask } from '@react-input/mask';
import { z } from "zod"
import { IFormData } from "../model";

const useHook = () => {
    const formSchema = z.object({
        username: z.string().min(3),
        CPF: z.string().refine((value) => cpf.isValid(value)),
        birth: z.string().refine((value) => {
            const parsedDate = parse(value, "dd/MM/yyyy", new Date());
            return isValid(parsedDate);
        }),
        gender: z.string().refine((val) => ["male", "female"].includes(val))
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            CPF: "",
            birth: "",
            gender: ""
        },
    })

    const username = form.watch("username");
    const CPF = form.watch("CPF");
    const birth = form.watch("birth");
    const gender = form.watch("gender");
    
    const isAllFilled = username?.trim() !== "" && CPF?.trim() !== "" && birth?.trim() !== "" && gender?.trim() !== "";
    
    const inputBirthRef = useMask({
        mask: '__/__/____',
        replacement: { _: /\d/ },
    });

    const inputCPFRef = useMask({
        mask: '___.___.___-__',
        replacement: { _: /\d/ },
    });

    const onSubmit = (data: IFormData) => {
        console.log("data: ", data)
    }

    return { form, isAllFilled, inputBirthRef, inputCPFRef, onSubmit }
}

export default useHook