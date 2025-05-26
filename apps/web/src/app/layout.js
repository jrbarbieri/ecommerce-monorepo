import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import ApolloClientProvider from "@/lib/ApolloClientProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloClientProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
