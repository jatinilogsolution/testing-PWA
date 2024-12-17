<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Check, ChevronsUpDown } from "lucide-vue-next";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Label from "../label/Label.vue";
 
 const props = defineProps<{
  title: string;
  frameworks: Framework[];
  isOpen: boolean;
  referenceIs: any;
  defaultValue: any;
  placeholder: string
}>();
const model = defineModel();

onMounted(() => {
  model.value = props.defaultValue;
});

interface Framework {
  value: string;
  label: string;
}

interface ValueProps {
  value: string | unknown;
  label?: string;
}
const open = ref(props.isOpen ?? false);
const value = ref<ValueProps>({
  value: model,
  label: "",
});
</script>

<template>
  <div class="grid w-full items-center gap-1">
    <Label>{{ title }}</Label>
    <Popover v-model:open="open" :ref="referenceIs">
      <PopoverTrigger as-child>
        <Button variant="outline" role="combobox" :aria-expanded="open"
          class="w-full border border-gray-400  overflow-hidden justify-between">
          {{
            value.label
              ? props.frameworks.find(
                (framework) => framework.label === value.label
              )?.label
              : value.value
                ? props.frameworks.find(
                  (framework) => framework.value === value.value
                )?.label
                : `Select ${title}...`
          }}
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-full  h-56 overflow-y-auto p-0">
        <Command>
          <CommandInput class="h-9" :placeholder="props.placeholder"/>
          <CommandEmpty class="w-full">No {{ title }} found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem class="w-full" v-for="framework in props.frameworks" :key="framework.label"
                :value="framework.label" @select="(ev) => {
                  if (typeof ev.detail.value === 'string') {
                    value.label = ev.detail.value;

                    value.value = framework.value;
                  }
                  open = false;
                }
                  ">
                {{ framework.label }}
                <Check :class="cn(
                  'ml-auto h-4 w-4',
                  value.value === framework.value
                    ? 'opacity-100'
                    : 'opacity-0'
                )
                  " />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>
