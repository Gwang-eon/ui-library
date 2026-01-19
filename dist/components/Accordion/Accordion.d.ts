import { default as React } from 'react';
export interface AccordionProps {
    children: React.ReactNode;
    className?: string;
}
export interface AccordionItemProps {
    title: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
    icon?: React.ReactNode;
    className?: string;
}
declare const AccordionItem: React.FC<AccordionItemProps>;
declare const Accordion: React.FC<AccordionProps> & {
    Item: typeof AccordionItem;
};
export { Accordion };
