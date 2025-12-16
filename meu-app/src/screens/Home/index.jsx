import {useState, useEffect} from "react";
import {ActivityIndicator, RefreshControl} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import CategoryChip from "../../components/styleds/CategoryChip";
import AuctionCard from "../../components/styleds/AuctionCard";
import auctionService from "../../services/auctionService";
import {
    Container,
    Header,
    HeaderTop,
    MenuButton,
    LocationContainer,
    LocationLabel,
    LocationText,
    NotificationButton,
    NotificationBadge,
    SearchContainer,
    SearchInput,
    Content,
    Section,
    SectionHeader,
    SectionTitle,
    SeeAllButton,
    SeeAllText,
    CategoriesContainer,
    AuctionsContainer,
    FloatingButton,
    FloatingButtonText,
    GreetingText,
    WelcomeText,
} from "./styles";

export default function Home({navigation}) {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState([]);
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        loadAuctions();
    }, [selectedCategory]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery.trim()) {
                searchAuctions();
            } else {
                loadAuctions();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const loadCategories = async () => {
        try {
            const data = await auctionService.getCategories();
            setCategories(data);
        } catch (error) {
            console.error("Erro ao carregar categorias:", error);
        }
    };

    const loadAuctions = async () => {
        try {
            setLoading(true);
            const data = await auctionService.getAuctionsByCategory(selectedCategory);
            setAuctions(data);
        } catch (error) {
            console.error("Erro ao carregar leilões:", error);
        } finally {
            setLoading(false);
        }
    };

    const searchAuctions = async () => {
        try {
            setLoading(true);
            const data = await auctionService.searchAuctions(searchQuery);
            setAuctions(data);
        } catch (error) {
            console.error("Erro ao buscar leilões:", error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadCategories();
        await loadAuctions();
        setRefreshing(false);
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        setSearchQuery("");
    };

    const handleAuctionPress = (auctionId) => {
        console.log("Navegar para detalhes do leilão", auctionId);
    };

    const handleLiveAuction = () => {
        console.log("Navegar para leilões ao vivo");
    };

    return (
        <Container>
            <Header>
                <HeaderTop>
                    <MenuButton onPress={() => {
                    }}>
                        <Ionicons name="menu" size={28} color="#333"/>
                    </MenuButton>

                    <LocationContainer>
                        <LocationLabel>LEILÕES EM</LocationLabel>
                        <LocationText>São Paulo, BR</LocationText>
                    </LocationContainer>

                    <NotificationButton onPress={() => {
                    }}>
                        <Ionicons name="notifications-outline" size={28} color="#333"/>
                        <NotificationBadge/>
                    </NotificationButton>
                </HeaderTop>

                <GreetingText>Olá, Seja bem-vindo(a)!</GreetingText>
                {/*Criar método para saber o horário da saudação, bom-dia, boa-tarde e boa-noite*/}
                <WelcomeText>Boa Tarde!</WelcomeText>

                <SearchContainer>
                    <Ionicons name="search" size={20} color="#999"/>
                    <SearchInput
                        placeholder="Buscar leilões, produtos..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </SearchContainer>
            </Header>

            <Content
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
            >
                <Section>
                    <SectionHeader>
                        <SectionTitle>Todas as Categorias</SectionTitle>
                        <SeeAllButton onPress={() => {
                        }}>
                            <SeeAllText>Ver Tudo</SeeAllText>
                            <Ionicons name="chevron-forward" size={16} color="#ff6b35"/>
                        </SeeAllButton>
                    </SectionHeader>

                    <CategoriesContainer>
                        {categories.map((category) => (
                            <CategoryChip
                                key={category.id}
                                icon={category.icone}
                                label={category.nome}
                                selected={selectedCategory === category.id}
                                onPress={() => handleCategorySelect(category.id)}
                            />
                        ))}
                    </CategoriesContainer>
                </Section>

                <Section>
                    <SectionHeader>
                        <SectionTitle>Leilões Ativos</SectionTitle>
                        <SeeAllButton onPress={() => {
                        }}>
                            <SeeAllText>Ver Tudo</SeeAllText>
                            <Ionicons name="chevron-forward" size={16} color="#ff6b35"/>
                        </SeeAllButton>
                    </SectionHeader>

                    {loading ? (
                        <ActivityIndicator
                            size="large"
                            color="#ff6b35"
                            style={{marginTop: 20}}
                        />
                    ) : (
                        <AuctionsContainer>
                            {auctions.length > 0 ? (
                                auctions.map((auction) => (
                                    <AuctionCard
                                        key={auction.id}
                                        title={auction.titulo}
                                        description={auction.descricao}
                                        imageUrl={auction.imagemUrl}
                                        currentBid={auction.currentBidFormatted}
                                        timeRemaining={auction.timeRemaining}
                                        totalBids={auction.totalLances}
                                        onPress={() => handleAuctionPress(auction.id)}
                                    />
                                ))
                            ) : (
                                <SectionTitle style={{textAlign: "center", marginTop: 20}}>
                                    Nenhum leilão encontrado
                                </SectionTitle>
                            )}
                        </AuctionsContainer>
                    )}
                </Section>
            </Content>

            <FloatingButton onPress={handleLiveAuction} activeOpacity={0.8}>
                <Ionicons name="radio" size={24} color="#fff"/>
                <FloatingButtonText>Leilão Live</FloatingButtonText>
            </FloatingButton>
        </Container>
    );
}
