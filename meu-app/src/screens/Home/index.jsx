import {useState, useEffect} from "react";
import {ActivityIndicator, RefreshControl, Alert} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import CategoryChip from "../../components/styleds/CategoryChip";
import AuctionCard from "../../components/styleds/AuctionCard";
import MenuDrawer from "../../components/styleds/MenuDrawer";
import FilterModal from "../../components/styleds/FilterModal";
import auctionService from "../../services/auctionService";
import { moderateScale } from "../../utils/responsive";
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
    const { signOut } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState([]);
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [activeFilters, setActiveFilters] = useState(null);

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

    const handleAuctionPress = (auction) => {
        navigation.navigate("AuctionDetails", { auction });
    };
    const handleApplyFilters = async (filters) => {
        try {
            setLoading(true);
            setActiveFilters(filters);
            let data = [];

            if (filters.startDate && filters.endDate) {
                data = await auctionService.getAuctionsByDateRange(
                    filters.startDate,
                    filters.endDate
                );
            } else if (filters.city || filters.state) {
                data = await auctionService.getAuctionsByLocation(
                    filters.city || "",
                    filters.state || ""
                );
            } else if (filters.auctioneer) {
                data = await auctionService.getAuctionsByAuctioneer(
                    filters.auctioneer
                );
            } else {
                data = await auctionService.getActiveAuctions();
            }

            setAuctions(data);
        } catch (error) {
            console.error("Erro ao aplicar filtros:", error);
            Alert.alert("Erro", "Não foi possível aplicar os filtros");
        } finally {
            setLoading(false);
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 12) {
            return "Bom dia!";
        } else if (hour >= 12 && hour < 18) {
            return "Boa tarde!";
        } else {
            return "Boa noite!";
        }
    };

    const handleLogout = async () => {
        setMenuVisible(false);
        
        Alert.alert(
            "Sair",
            "Deseja realmente sair da sua conta?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await signOut();
                        } catch (error) {
                            console.error("Erro no logout:", error);
                            Alert.alert("Erro", "Não foi possível fazer logout");
                        }
                    }
                }
            ]
        );
    };

    return (
        <Container>
            <Header>
                <HeaderTop>
                    <MenuButton onPress={() => setMenuVisible(true)}>
                        <Ionicons name="menu" size={moderateScale(24)} color="#FFFFFF"/>
                    </MenuButton>

                    <LocationContainer>
                        <LocationLabel>LEILÕES EM</LocationLabel>
                        <LocationText>São Paulo, BR</LocationText>
                    </LocationContainer>

                    <NotificationButton onPress={() => setFilterModalVisible(true)}>
                        <Ionicons name="funnel-outline" size={moderateScale(24)} color="#FFFFFF"/>
                        {activeFilters && <NotificationBadge/>}
                    </NotificationButton>
                    
                    <NotificationButton onPress={() => {
                    }}>
                        <Ionicons name="notifications-outline" size={moderateScale(24)} color="#FFFFFF"/>
                        <NotificationBadge/>
                    </NotificationButton>
                </HeaderTop>

                <GreetingText>Olá, Seja bem-vindo(a)!</GreetingText>
                <WelcomeText>{getGreeting()}</WelcomeText>

                <SearchContainer>
                    <Ionicons name="search" size={moderateScale(20)} color="#999"/>
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
                            <Ionicons name="chevron-forward" size={moderateScale(16)} color="#5A9FD4"/>
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
                            <Ionicons name="chevron-forward" size={moderateScale(16)} color="#5A9FD4"/>
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
                                    auctioneer={auction.leiloeiro}
                                    city={auction.cidade}
                                    state={auction.estado}
                                    date={auction.dataInicio}
                                    totalLots={auction.totalLotes || 0}
                                    onPress={() => handleAuctionPress(auction)}
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

            <FloatingButton activeOpacity={0.8}>
                <Ionicons name="radio" size={moderateScale(24)} color="#fff"/>
                <FloatingButtonText>Leilão Live</FloatingButtonText>
            </FloatingButton>

            <MenuDrawer
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onLogout={handleLogout}
                navigation={navigation}
            />
            
            <FilterModal
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                onApplyFilters={handleApplyFilters}
            />
        </Container>
    );
}
